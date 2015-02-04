(function() {
    'use strict';
    angular.module('konturApp', []);
})();
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

(function() {
    'use strict';
    angular.module('konturApp')
        .controller('matrixController', matrixCtrl);

    matrixCtrl.$inject =  ['$log', 'matrixConstant'];

    function matrixCtrl($log, matrixConstant) {
        var vm = this;
        vm.model = {
            matrix: {
                a: {
                    name: 'a',
                    rows: 3,
                    cols: 3,
                    values: function() {return this.rows * this.cols;},
                    value: [
                        10, 10, 10,
                        10, 10, 10,
                        10, 10, 10
                    ]
                },
                b: {
                    name: 'b',
                    rows: 3,
                    cols: 3,
                    values: function() {return this.rows * this.cols;},
                    value: [
                        10, 10, 10,
                        10, 10, 10,
                        10, 10, 10
                    ]
                },
                c: {
                    name: 'c',
                    rows:3,
                    cols: 3,
                    values: function() {return this.rows * this.cols;},
                    value: [

                    ]
                }
            },
            selectMatrix: 'a',
            showResult: false,
            showError: false,
            showWarning: false,
            error: '',
            warning: '',
            actionBlock: {
                success: function () {
                    vm.style.actionBlock = {
                        success: true,
                        warning: false,
                        error: false
                    }
                },
                warning:  function () {
                    vm.style.actionBlock = {
                        success: false,
                        warning: true,
                        error: false
                    }
                },
                error:  function () {
                    vm.style.actionBlock = {
                        success: false,
                        warning: false,
                        error: true
                    }
                }
            }
        };
        vm.style = {
            actionBlock : {
                success: false,
                warning: false,
                error: false
            }
        };
        vm.mulp = mulp;
        vm.clean = clean;
        vm.replace = replace;
        vm.addRow = addRow;
        vm.removeRow = removeRow;
        vm.addCol = addCol;
        vm.removeCol = removeCol;
        vm.getNumber = getNumber;
        vm.getRowId = getRowId;
        vm.getColId = getColId;

        function getRowId(id, cols) {
            return parseInt(id/cols);
        }

        function getColId(id, cols) {
            return id%cols;
        }

        function mulp() {
            vm.model.showResult = false;
           if(vm.model.matrix.a.cols == vm.model.matrix.b.rows) {
               var rowsA =vm.model.matrix.a.rows;
               var colsA = vm.model.matrix.a.cols;
               var colsB = vm.model.matrix.b.cols;
               vm.model.matrix.c.rows = rowsA;
               vm.model.matrix.c.cols = colsB;

               for(var j = 0; j < colsB; j++) {
                   for(var i = 0; i < rowsA; i++) {
                       var id = i * colsB + j;
                       vm.model.matrix.c.value[id] = 0;
                       for (var r = 0; r < colsA; r++) {
                           var a_id = i * colsA + r;
                           var b_id = r * colsB + j;
                           vm.model.matrix.c.value[id] += vm.model.matrix.a.value[a_id]*vm.model.matrix.b.value[b_id];
                       }
                   }
               }
               showSuccess();
           } else {
               showError('Такие матрица нельзя перемножить, так как количество столбцов матрицы A не равно количеству строк матрицы B');
           }
        }

        function clean() {
            vm.model.matrix.a.value = [];
            vm.model.matrix.b.value = [];
        }

        function replace() {
            var matrix = angular.copy(vm.model.matrix.b);
            vm.model.matrix.b = angular.copy(vm.model.matrix.a);
            vm.model.matrix.b.name = 'b';
            vm.model.matrix.a = matrix;
            vm.model.matrix.a.name = 'a';
        }

        function addRow() {
            if(vm.model.selectMatrix == 'a') {
                if(vm.model.matrix.a.rows < matrixConstant.rows.max) {
                    vm.model.matrix.a.rows++;
                } else {
                    showWarning('Невозможно больше увеличивать количество строк для матрицы A');
                }
            } else if(vm.model.selectMatrix == 'b') {
                if(vm.model.matrix.b.rows < matrixConstant.rows.max) {
                    vm.model.matrix.b.rows++;
                } else {
                    vm.model.actionBlock.warning();
                    showWarning('Невозможно больше увеличивать количество строк для матрицы B');
                }
            }
        }

        function removeRow() {
            if(vm.model.selectMatrix == 'a') {
                if (vm.model.matrix.a.rows > matrixConstant.rows.min) {
                    vm.model.matrix.a.rows--;
                } else {
                    showWarning('Невозможно больше уменьшать количество строк для матрицы A');
                }
            } else if(vm.model.selectMatrix == 'b') {
                if(vm.model.matrix.b.rows > matrixConstant.rows.min) {
                    vm.model.matrix.b.rows--;
                } else {
                    showWarning('Невозможно больше уменьшать количество строк для матрицы B');
                }
            }
        }

        function addCol() {
            if(vm.model.selectMatrix == 'a') {
                if (vm.model.matrix.a.cols < matrixConstant.cols.max) {
                    vm.model.matrix.a.cols++;
                } else {
                    showWarning('Невозможно больше увеличивать количество столбцов для матрицы A');
                }
            } else if(vm.model.selectMatrix == 'b') {
                if(vm.model.matrix.b.cols < matrixConstant.cols.max) {
                    vm.model.matrix.b.cols++;
                } else {
                    showWarning('Невозможно больше увеличивать количество столбцов для матрицы B');
                }
            }
        }

        function removeCol() {
            if(vm.model.selectMatrix == 'a') {
                if (vm.model.matrix.a.cols > matrixConstant.cols.min) {
                    vm.model.matrix.a.cols--;
                } else {
                    showWarning('Невозможно больше уменьшать количество столбцов для матрицы A');
                }
            } else if(vm.model.selectMatrix == 'b') {
                if(vm.model.matrix.b.cols > matrixConstant.cols.min) {
                    vm.model.matrix.b.cols--;
                } else {
                    showWarning('Невозможно больше уменьшать количество столбцов для матрицы B');
                }
            }
        }
        function showSuccess() {
            vm.model.warning = '';
            vm.model.error = '';
            vm.model.actionBlock.success();
            vm.model.showResult = true;
        }

        function showWarning(text) {
            vm.model.warning = text;
            vm.model.showWarning = true;
            vm.model.actionBlock.warning();
        }

        function showError(text) {
            vm.model.error = text;
            vm.model.showError = true;
            vm.model.actionBlock.error();
        }

        function getNumber(num) {
            return new Array(num);
        }
    }
})();