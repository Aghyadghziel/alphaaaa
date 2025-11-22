const form = document.getElementById('newsletterForm');
const submitBtn = document.getElementById('submitBtn');
const firstNameInput = document.getElementById('firstName');
const emailInput = document.getElementById('emailAddress');

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxPwikXtVUh_l-LmO4_DI1YfwhuyVo3YA-tf6wNNz8Wc_-TI5FvdXkeT4ifaWBZrUft/exec';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate form and enable/disable submit button
function validateForm() {
    const firstNameValid = firstNameInput.value.trim().length > 0;
    const emailValid = emailRegex.test(emailInput.value.trim());
    
    submitBtn.disabled = !(firstNameValid && emailValid);
}

// Add event listeners for real-time validation
firstNameInput.addEventListener('input', validateForm);
emailInput.addEventListener('input', validateForm);

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable button and show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'جاري الإرسال... <span class="spinner"></span>';

    // Prepare form data
    const formData = new FormData(form);

    // إضافة timeout للتأكد من عدم الانتظار أكثر من 3 ثواني
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve({ timeout: true }), 3000);
    });

    // إرسال البيانات
    const fetchPromise = fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
    }).then(async (response) => {
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            return response.ok ? { result: 'success' } : { result: 'error' };
        }
    }).catch(() => ({ result: 'error' }));

    try {
        // انتظر أيهما يأتي أولاً: الاستجابة أو الـ timeout
        const result = await Promise.race([fetchPromise, timeoutPromise]);

        // إذا حدث timeout أو نجحت العملية
        if (result.timeout || result.result === 'success') {
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'تم التسجيل بنجاح!',
                text: 'شكرًا لانضمامك إلى نشرتنا الإخبارية.',
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#D4AF37',
                background: '#1A1A1A',
                color: '#FFFFFF'
            });

            // Reset form
            form.reset();
            
            // إذا كان timeout، استمر في إرسال البيانات في الخلفية
            if (result.timeout) {
                fetchPromise.catch(() => {}); // تجاهل الأخطاء
            }
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        // Show error message
        Swal.fire({
            icon: 'error',
            title: 'حدث خطأ',
            text: 'عذراً، حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.',
            confirmButtonText: 'حسناً',
            confirmButtonColor: '#D4AF37',
            background: '#1A1A1A',
            color: '#FFFFFF'
        });
    } finally {
        // Re-enable button and restore original text
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = true;
    }
});

// Initial validation check
validateForm();