export function debounce(func, wait) {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        var executeFunction = function () {
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(executeFunction, wait);
    };
}
