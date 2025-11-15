$(document).ready(function () {
    $("#searchq").on("change", function () {
        var text = $(this).val();
        $("#archiveGlobalSearchField").val(text + " site:uh.edu/provost/students/student-policies inurl:student-policies");
    });

    $(".search-icon").on("click", function () {
        $("#policy-search").submit();
    });
});