import defaultTheme from './defaultTheme';

const THEMES = {
    initialThem: defaultTheme,
};

const getThemes = (theme = 'initialThem') => {
    return THEMES[theme]
};

export default getThemes;