import '@babel/polyfill';
import PerfectScrollbar from 'perfect-scrollbar';
// import Form from './utils/form';

const initPerfectScrollbar = () => {
    const scrollbarWrappers = document.querySelectorAll('.perferct-scrollbar');
    scrollbarWrappers.forEach((wrapper) => {
        new PerfectScrollbar(wrapper, {
            wheelSpeed: 0.5,
            wheelPropagation: true,
            minScrollbarLength: 20,
        });
    });
};

// Menu click start
const menuclick = () => {
    if (!$('body').hasClass('minimenu')) {
        $('.pc-navbar li.pc-hasmenu > a').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).siblings('.pc-submenu').removeAttr('style');
            if ($(this).parent().hasClass('pc-trigger')) {
                $(this).parent().removeClass('pc-trigger');
                $(this).parent().children('.pc-submenu').slideUp('fast');
            } else {
                $(this).parent().children('.pc-submenu').slideUp('fast');
                $(this).parent().removeClass('pc-trigger');
                $(this).parent().addClass('pc-trigger');
                $(this).siblings('.pc-submenu').slideDown('fast');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initPerfectScrollbar();
    menuclick();
    // Form();
});
