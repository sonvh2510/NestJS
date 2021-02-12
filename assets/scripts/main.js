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

$.fn.removeClassPrefix = function (prefix) {
    this.each(function (i, it) {
        var classes = it.className.split(' ').map(function (item) {
            return item.indexOf(prefix) === 0 ? '' : item;
        });
        it.className = classes.join(' ');
    });
    return this;
};
const changeStyle = () => {
    // header option
    $('#pct-toggler').on('click', function () {
        $('.pct-customizer').toggleClass('active');
    });
    // Header Color
    $('.brand-color > a').on('click', function () {
        var temp = $(this).attr('data-value');
        // $('.header-color > a').removeClass('active');
        // $('.pcoded-header').removeClassPrefix('brand-');
        // $(this).addClass('active');
        if (temp == 'bg-default') {
            $('.m-header').removeClassPrefix('bg-');
        } else {
            $('.m-header').removeClassPrefix('bg-');
            $('.m-header > .b-brand > .logo-lg').attr(
                'src',
                '/public/images/logo.svg',
            );
            $('.m-header').addClass(temp);
        }
    });
    // Header Color
    $('.header-color > a').on('click', function () {
        var temp = $(this).attr('data-value');
        // $('.header-color > a').removeClass('active');
        // $('.pcoded-header').removeClassPrefix('brand-');
        // $(this).addClass('active');
        if (temp == 'bg-default') {
            $('.pc-header').removeClassPrefix('bg-');
        } else {
            $('.pc-header').removeClassPrefix('bg-');
            $('.pc-header').addClass(temp);
        }
    });
    // sidebar option
    $('#cust-sidebar').on('change', function () {
        if ($(this).is(':checked')) {
            $('.pc-sidebar').addClass('light-sidebar');
            $('.pc-horizontal .topbar').addClass('light-sidebar');
            // $('.m-header > .b-brand > .logo-lg').attr('src', 'assets/images/logo-dark.svg');
        } else {
            $('.pc-sidebar').removeClass('light-sidebar');
            $('.pc-horizontal .topbar').removeClass('light-sidebar');
            // $('.m-header > .b-brand > .logo-lg').attr('src', 'assets/images/logo.svg');
        }
    });
    // header option
    $('#cust-sidebrand').on('change', function () {
        if ($(this).is(':checked')) {
            $('.theme-color.brand-color').removeClass('d-none');
            $('.m-header').addClass('bg-dark');
            $('.m-header > .b-brand > .logo-lg').attr(
                'src',
                '/public/images/logo-dark.svg',
            );
        } else {
            $('.m-header').removeClassPrefix('bg-');
            $('.theme-color.brand-color').addClass('d-none');
            $('.m-header > .b-brand > .logo-lg').attr(
                'src',
                '/public/images/logo.svg',
            );
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initPerfectScrollbar();
    changeStyle();
    menuclick();
    // Form();
});
