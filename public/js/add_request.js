document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="repairType"]');
    const otherInput = document.getElementById('otherRepairTypeInput');

    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.id === 'other') {
                otherInput.style.display = 'block';
            } else {
                otherInput.style.display = 'none';
            }
        });
    });
});