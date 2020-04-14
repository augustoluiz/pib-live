function copiaTexto() {
    const inputText = document.querySelector('#obslink')
    inputText.select()
    document.execCommand('copy')
}