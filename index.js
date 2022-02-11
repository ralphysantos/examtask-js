"use strict";
$(function () {

    class Student {
        error = [];
        name = '';
        grade = '';
        constructor(n) {
            this.setName(n);
        }

        setName(n) {
            if (n.length <= 0) {
                this.error["name"] = {
                    "status": false,
                    "message": "please insert student name"
                };
            } else {
                if (this.error["name"] != undefined) {
                    this.error.splice(this.error["name"], 1);
                }
            }
            this.name = n;
        }

        getName() {
            return this.name;
        }

        setGrade($g) {
            if (!this.checkGrade($g)) {
                this.error['grade'] = {
                    "status": false,
                    "message": "please insert numeric value on grade input box"
                };
            } else {
                if (this.error["grade"] != undefined) {
                    this.error.splice(this.error["grade"], 1);
                }
            }
            this.grade = $g;
        }

        checkGrade($g) {
            let flag = false;
            let grade = $g;
            let regex = /^[0-99]+$/;

            if (grade.length <= 0) {
                flag = false;
            }
            if (regex.test(grade)) {
                flag = true;
            }

            return flag;
        }

        isValid() {
            return Object.keys(this.error).length <= 0;
        }
    }

    const list = [];
    var GradeBook = {
        list,
        add: function ($student) {

            list.push($student);
        },
        list: function () {
            return list;
        },
        clearList: function () {
            list.length = 0;
        },
        removeItem() {
            console.log('asdasdas');
        },
        generateTable: function () {
            let student_list = list;
            let body = '';
            student_list.forEach((e, index) => {
                let pre = '<tr>';
                let suf = '</tr>';
                let bod = '';
                Object.keys(e).forEach(function (key, value) {
                    if (!Array.isArray(e[key])) {
                        bod += "<td>" + e[key] + "</td>";
                    }
                });
                bod+='<td><button class="btn btn-primary btn-sm testbutton" id="testbutton" data-index='+index+'>X</button></td>';
                body += pre + bod + suf;
            });
            return body;
        },
        removeItem(index){
            list.splice(index, 1);
        }

    }

    submitgrade.onclick = function () {
        let student_name = $("#studentname").val();
        let student_grade = $("#studentgrade").val();



        let student = new Student(student_name);
        student.setGrade(student_grade);

        if (!student.isValid()) {
            $('.error-text').hide().html('');
            for (const [key, value] of Object.entries(student.error)) {
                $(`#${key}-error`).show().html(value.message);
            }
        } else {
            $('.error-text').hide().html('');
            GradeBook.add(student);
            $("#results").html(GradeBook.generateTable());
            $("#studentname").val('');
            $("#studentgrade").val('');
        }
    }

    calculateAve.onclick = function () {
        let list = GradeBook.list();
        let total = 0;
        let count = 0;
        let ave = 0;
        list.forEach((e) => {
            total += parseFloat(e.grade);
            count += 1;
        });

        ave = (total > 0) ? total / count : 0;
        $("#average").html(ave);
    }
    clearTable.onclick = function () {
        GradeBook.clearList();
        $("#results").html(GradeBook.generateTable());
    }

    $(document).on('click','.testbutton',function(e){
        e.preventDefault();
        let index =$(this).data('index');

        GradeBook.removeItem(index);
        $("#results").html(GradeBook.generateTable());
    });
});

