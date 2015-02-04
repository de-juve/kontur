(function() {
    'use strict';
    angular.module('konturApp')
        .constant('matrixConstant', {
            rows: {
                min: 2,
                max: 10
            },
            cols: {
                min: 2,
                max: 10
            },
            value: {
                min: 0,
                max: 10
            }
        });
})();
