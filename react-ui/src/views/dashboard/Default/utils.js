const saveImageAsFile = (imageData) => {
    const blob = new Blob([imageData], { type: 'image/png' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'imagen.png';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
};