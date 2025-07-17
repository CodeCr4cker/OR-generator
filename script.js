// QR Code Generator using Qrious.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('qrForm');
    const textInput = document.getElementById('textInput');
    const qrCanvas = document.getElementById('qrCode');
    const downloadBtn = document.getElementById('downloadBtn');
    const outputArea = document.getElementById('outputArea');
    const downloadArea = document.getElementById('downloadArea');
    
    // QRious instance
    let qr = new QRious({
        element: qrCanvas,
        size: 220,
        value: '',
        background: 'white',
        foreground: '#185a9d',
        level: 'H'
    });

    function generateQR(text) {
        // Dynamically adjust QR code size for very long text
        let size = 220;
        if (text.length > 800) size = 320;
        else if (text.length > 400) size = 270;
        qr.set({
            value: text,
            size: size
        });
        qrCanvas.style.display = text.trim() ? 'block' : 'none';
        downloadArea.style.display = text.trim() ? 'flex' : 'none';
        // Animate
        qrCanvas.classList.remove('qrBounce');
        void qrCanvas.offsetWidth; // force reflow
        qrCanvas.classList.add('qrBounce');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let text = textInput.value.trim();
        generateQR(text);
    });

    textInput.addEventListener('input', function () {
        let text = textInput.value.trim();
        if (!text) {
            qrCanvas.style.display = 'none';
            downloadArea.style.display = 'none';
        }
    });

    downloadBtn.addEventListener('click', function () {
        let link = document.createElement('a');
        link.download = 'qr_code.png';
        link.href = qrCanvas.toDataURL('image/png');
        link.click();
    });

    // Initial state
    qrCanvas.style.display = 'none';
    downloadArea.style.display = 'none';
});