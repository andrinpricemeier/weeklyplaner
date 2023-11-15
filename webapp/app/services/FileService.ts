const base64StringToArrayBuffer = (base64: string): Uint8Array => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

const saveBytes = (filename: string, fileDataByteArray: Uint8Array, mime: string): void => {
    const blob = new Blob([fileDataByteArray], {type: mime});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

export const saveWordDocument = (filename: string, fileContentsBase64: string): void => {
    const fileContentsByteArray = base64StringToArrayBuffer(fileContentsBase64);
    saveBytes(filename, fileContentsByteArray, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
}