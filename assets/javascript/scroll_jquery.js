function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateData(email, description) {
    if (email === '' || description === '') {
        return false;
    }

    if (!validateEmail(email)) {
        return false;
    } else {
        return true;
    }
}

$(document).ready(function() {

    $('a.info-button').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
        }

        const hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800)
    })

    $('button.header-button').on('click', function(e) {
        $('html, body').animate({
            scrollTop: $('#projects').offset().top
        }, 4500)
    })

    $('#submit_button').click(function() {

        let email = $('.continue-contact input').val();
        let textarea = $('.continue-contact textarea').val();
        if (!validateData(email, textarea)) {

            document.querySelector('.continue-contact input').value = "";
            document.querySelector('.continue-contact textarea').value = "";
            document.getElementById('popup-text').innerHTML = 'The email was not valid or the description was empty...';
                $('.email-success-popup').removeClass('email-display-none');
                TweenMax.from('.email-success-popup', 1, {
                    css: {
                        y: 200,
                        opacity: 0
                    },
                    ease: Expo.easeOut
                })
                setTimeout(function() {
                    $('.email-success-popup').addClass('email-display-none');
                    document.getElementById('popup-text').innerHTML = 'The message was sent with success :D';
                }, 2500)
            return;
        }

        $.ajax({
            url: 'https://portfolio-personal-server.herokuapp.com/receive-data',
            type: 'POST',
            dataType: 'text',
            success: function(data) {
                document.querySelector('.continue-contact input').value = "";
                document.querySelector('.continue-contact textarea').value = "";
                $('.email-success-popup').removeClass('email-display-none');
                TweenMax.from('.email-success-popup', 1, {
                    css: {
                        y: 200,
                        opacity: 0
                    },
                    ease: Expo.easeOut
                })
                setTimeout(function() {
                    $('.email-success-popup').addClass('email-display-none');
                }, 2500)
            },
            data: {
                email: email,
                description: textarea
            }
        });

    })

    $('#more-info-button').click(function() {

        if (!validateData(email, textarea)) {

            document.querySelector('.info-col input').innerHTML = "";
            document.querySelector('.info-col textarea').innerHTML = "";
            document.getElementById('popup-text').innerHTML = 'The email was not valid or the description was empty...';
            $('.email-success-popup').addClass('email-white-color');
            
            $('.email-success-popup').removeClass('email-display-none');
            TweenMax.from('.email-success-popup', 1, {
                css: {
                    y: 200,
                    opacity: 0
                },
                ease: Expo.easeOut
            })
            setTimeout(function() {
                $('.email-success-popup').addClass('email-display-none');
                document.getElementById('popup-text').innerHTML = 'The message was sent with success :D';
            }, 2500)

            return;
        }

        $.ajax({
            url: 'https://portfolio-personal-server.herokuapp.com/receive-data',
            type: 'POST',
            success: function(data) {
                document.querySelector('.info-col input').innerHTML = "";
                document.querySelector('.info-col textarea').innerHTML = "";
                $('.email-success-popup').addClass('email-white-color');
                $('.email-success-popup').removeClass('email-display-none');
                TweenMax.from('.email-success-popup', 1, {
                    css: {
                        y: 200,
                        opacity: 0
                    },
                    ease: Expo.easeOut
                })
                setTimeout(function() {
                    $('.email-success-popup').addClass('email-display-none');
                }, 2500)
            },
            data: {
                email: email,
                description: textarea
            }
        })

        

    })

})