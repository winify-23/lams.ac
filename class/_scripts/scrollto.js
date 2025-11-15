        $(document).ready(function (){
            $("#scrollTo").click(function (){
                $('html, body').animate({
                    scrollTop: $(".site-name").offset().top
                }, 1000);
            });
        });
