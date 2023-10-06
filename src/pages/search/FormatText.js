const FormatText = (content, keySearch) => {
    const renderText = (text, key) => {
        if (text && key) {
            const search = new RegExp(key, 'i')
            text = text.replace(search, '<span  class="highlighted-text">$&</span>');
            return text;
        }
        return ''
    }
    const newKey = keySearch ? keySearch.replace('/', '') : '';
    return renderText(content, newKey)
};

export default FormatText;
