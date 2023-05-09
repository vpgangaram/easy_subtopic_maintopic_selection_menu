$(document).ready(function() {
    var myObject = {};

    $('#my-form').on('submit', function(event) {
        event.preventDefault();
        const $maintopicSelect = $('#maintopic-select');

        $maintopicSelect.empty();
        $maintopicSelect.append($('<option selected disabled>Select Main topic</option>'));
        Object.keys(myObject).forEach(function(maintopic) {
            const $option = $('<option>').val(maintopic).text(maintopic);
            $maintopicSelect.append($option);
        });
    });

    $('#add-subtopic').on('click', function(event) {
        event.preventDefault(); 

        var mainTopic = $('#maintopic').val();
        var subtopic = $('#subtopic').val();
        var template = $('#template').val();

        // Add subtopic to main topic object
        if (!(mainTopic in myObject)) {
            myObject[mainTopic] = {};
        }
        myObject[mainTopic][subtopic] = template;

        $('#subtopic').val('');
        $('#template').val('');

        // Update main topic select field
    });
      
    // Listen for changes to the main topic select menu
    const $maintopicSelect = $('#maintopic-select');
    $maintopicSelect.on('change', function() {
        const selectedMaintopic = $(this).val();
        const $subtopicSelect = $('#subtopic-select');
        const $templateTextarea = $('#template-textarea');

        // Populate the subtopic select menu with the subtopics of the selected main topic
        $subtopicSelect.empty();
        $subtopicSelect.append($('<option value="" selected disabled>Select a main topic first</option>'))
        Object.keys(myObject[selectedMaintopic]).forEach(function(subtopic) {
            const $option = $('<option>').val(subtopic).text(subtopic);
            $subtopicSelect.append($option);
        });

        // Update the template textarea with the selected subtopic's template
        $templateTextarea.val('').prop('disabled', true);
        $subtopicSelect.prop('disabled', false).off('change').on('change', function() {
            const selectedSubtopic = $(this).val();
            const selectedTemplate = myObject[selectedMaintopic][selectedSubtopic];
            $templateTextarea.val(selectedTemplate);
        });
    });
});