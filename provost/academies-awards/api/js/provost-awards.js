//onload, look for elemnents with the data-widget attribute
let widgets = document.querySelectorAll('[data-widget]');

window.addEventListener('hashchange', () => {
    //@TODO: Find a better way to handle this. See documentation for more details.
    window.scrollTo('top', 'smooth');
    window.location.reload();
})

//for each item that has the data-widget attribute, get the data from the api endpoint
widgets.forEach((widget) => {
    let option = widget.dataset.widget;

    //if the option is 'award' or 'recipient', then get the award name from the hash
    if (option == 'award' || option == 'recipient') {
        let name = window.location.hash;
        name = name.replace('#/', '');
        option += '&name=' + encodeURIComponent(name);
    }

    getData(option).then((d) => {
        //if the option is 'award' or 'recipient', then get the award name from the hash
        if (widget.dataset.widget == 'award' || widget.dataset.widget == 'recipient') {
            let parent = $(widget).parents('section');
            //get the parent section element
            parent.after(d['html']);
            parent.hide();
            
            //remove the data-widget element
            $(`[data-widget="${option}"]`).remove();
        } else {
            //append the results to the innerhtml of the data-widget element
            widget.innerHTML = d['html'];
        }

    })
})

async function getData(option) {
    let endpoint = '/provost/academies-awards/api/api/?option=' + option;
    return $.ajax({
        url: endpoint,
        type: 'GET',
        success: (data) => {
            return (data);
        },
        error: (err) => {
            throw (err);
        }
    })
}

function filterList(inputElement) {
    //get the inputs parent element
    var p = $(inputElement).parent();
    
    //get the list elements
    var ul = p.find('ul');
    var li = $(ul).children('li:not(.recipient-header)')

    //get the value just typed into textbox -- see .toLowerCase()
    var val = inputElement.value.toLowerCase();

    //loop through the list items
    for (var i = 0; i < li.length; i++) {
        //get the text of the list item
        var text = li[i].innerText.toLowerCase();

        //if the text of the list item contains the value typed into the textbox, then show it
        if (text.indexOf(val) > -1) {
            li[i].style.display = 'block';
        } else {
            li[i].style.display = 'none';
        }
    }

    //if the textbox is empty, then show all list items
    if (val == '') {
        li.each(function (i, e) {
            e.style.display = 'block';
        });
    }
};

function filterWithRecipients() {
    //All awards shown by default
    $('#filter-with-recipients').toggleClass('show-recipients');
    $('#filter-with-recipients').toggleClass('show-all');

    $('#filter-with-recipients').text($('#filter-with-recipients').text() == 'Show Only With Recipients' ? 'Show All' : 'Show Only With Recipients');
    
    //toggle the class of the awards
    $('.award.no-recipient').parent().toggleClass('hidden');
}