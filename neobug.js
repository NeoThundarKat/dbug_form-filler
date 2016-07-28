var NeoBug = (function () {
    var petNames = [
        "Fido",
        "Alexander",
        "Fluffy",
        "Bailey",
        "Max",
        "Charlie",
        "Buddy",
        "Bella",
        "Lucy",
        "Molly",
        "Daisy"
    ];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = dd + '/' + mm + '/' + yyyy;

    function successMessage(msg) {
        console.log('%c ' + msg + ' ', 'background: #222; color: #7FFF00; font-size:21px;');
    }
    function errorMessage(msg) {
        console.log('%c ' + msg + ' ', 'background: #222; color: #FF6666; font-size:21px;');
    }
    function neutralMessage(msg) {
        console.log('%c ' + msg + ' ', 'background: #222; color: #FFF; font-size:21px;');
    }

    function fillData() {
        console.info("Neobug is filling out any available inputs, and making sure they all have a label attached to them.");
        var inputs = $('input, select');
        var missingLabels = 0;
        inputs.each(function (i) {
            var input = $(this);
            var label = $('label[for="' + input.attr('id') + '"]');

            setTimeout(function () {

                input.focus();
                if (input.attr('type') == 'text') {

                    if (label.length <= 0) {
                        label = input.parent().parent().find('label');
                        console.warn("NeoBug says: the input below does not have a clear label! Finding closest label available...");

                        missingLabels++;
                        if (label.length <= 0) {
                            console.error("NeoBug says: the input below does not have a clear label, and I could not find an usable label replacement!");
                            input.val("No Label!");
                        }
                        
                        console.info(input);
                        console.log("---");
                    }

                    input.val(discoverData(input.attr('type'), label.text()));
                }
                if (input.attr('type') == 'radio') {
                    var radioGroupName = input.attr('name');
                    if ($('input[name="' + radioGroupName + '"]').first().prop('checked')) {
                        if (Math.random() <= .5) {
                            label.click();
                        }
                    } else {
                        label.click();
                    }
                    
                }
                if (input.attr('type') == 'checkbox') {
                    input.click();
                }
                if (input.is('select')) {
                    input.val(input.find('option').last().attr('value')).selectric('refresh');
                }
            }, 100 * i);
        });


        //Error Reporting
        setTimeout(function () {

            if (missingLabels > 0) {
                errorMessage('There are '+missingLabels+' inputs without labels!');
            } else {
                successMessage('All inputs have a label!');
            }
        }, 100 * inputs.length + 500)

    }


    function discoverData(type, label) {
        var searchCrit = label.toLowerCase();
        if (type == "text") {
            if (searchCrit.indexOf("first name") >= 0) {
                return "John";
            }
            if (searchCrit.indexOf("last name") >= 0 || searchCrit.indexOf("surname") >= 0) {
                return "Doe";
            }
            if (searchCrit.indexOf("date of birth") >= 0) {
                return "23/03/1996";
            }
            if (searchCrit.indexOf("postcode") >= 0) {
                return "PO12 4JH";
            }
            if (searchCrit.indexOf("house number") >= 0) {
                return "1";
            }
            if (searchCrit.indexOf("address 1") >= 0) {
                return "1 Grove Road";
            }
            if (searchCrit.indexOf("address 2") >= 0) {
                return "";
            }
            if (searchCrit.indexOf("city") >= 0) {
                return "gosport";
            }
            if (searchCrit.indexOf("county") >= 0) {
                return "hampshire";
            }
            if (searchCrit.indexOf("promo code") >= 0 || searchCrit.indexOf("promotional code") >= 0) {
                return "";
            }
            if (searchCrit.indexOf("contact number") >= 0 || searchCrit.indexOf("telephone") >= 0) {
                return "07876 756 645";
            }
            if (searchCrit.indexOf('email address') >= 0) {
                return "email@example.com";
            }
            if (searchCrit.indexOf('start') >= 0) {
                return today;
            }
            if (searchCrit.indexOf('price') >= 0) {
                return Math.round(Math.random() * 100);
            }
            if (searchCrit.indexOf('price') >= 0) {
                return Math.round(Math.random() * 100);
            }
            if (searchCrit.indexOf('account holder') >= 0) {
                return "MR J R DOE";
            }
            if (searchCrit.indexOf('account number') >= 0) {
                return "4757 1569 8549 8756";
            }

            if (searchCrit.indexOf('sort code') >= 0) {
                return "11-11-11";
            }
            if (searchCrit.indexOf('pet') >= 0 && searchCrit.indexOf('name') >= 0) {
                return petNames[Math.round(Math.random()*petNames.length)];
            }

            return "Dummy Data";

        }
    }

    function testImages() {
        console.info("Neobug is testing all your images for alt tags.")
        var missingAlts = 0;
        $('img').each(function () {
            if ($(this).attr('alt') == "" || typeof $(this).attr('alt') == 'undefined') {
                console.warn("NeoBug says: this image does not have an alt tag!");
                console.log($(this));
                missingAlts++;
            }
        })

        if (missingAlts > 0) {
            errorMessage("NeoBug found " + missingAlts + " images missing alt tags!");
        } else {
            successMessage("All images have an alt attribute!");
        }

        return missingAlts;
    }

    function run() {
        neutralMessage('---------NEOBUG IS NOW ANALYSING--------- ');
        fillData();
        testImages();
    }

    var publicApi = {
        fillData: fillData,
        testImages: testImages,
        run: run
    };

    return publicApi;
})();



$(window).on('keydown', function (e) {
    var kc = e.keyCode || e.which;
    if (kc == 65 && e.ctrlKey && e.shiftKey) {
        NeoBug.run();
    }
})
