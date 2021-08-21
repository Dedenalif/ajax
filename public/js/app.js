$('body').on('click','.modal-show',function(e){
    e.preventDefault();

    var me = $(this),
        url = me.attr('href'),
        title = me.attr('title');

    $('#modal-title').text(title);
    $('#modal-btn-save').removeClass('hide').text(me.hasClass('edit') ? 'Update' : 'Create');

    $.ajax({
        url : url,
        dataType : 'html',
        success : function (response) {
            $('#modal-body').html(response);
        }
    });

    $('#modal').modal('show');
});

$('#modal-btn-save').click(function(e){
    e.preventDefault();

    var form = $('#modal-body form'),
        url = form.attr('action'),
        method = $('input[name=_method]').val() == undefined ? 'POST' : 'PUT';

    form.find('.help-block').remove();
    form.find('.form-group').removeClass('has-error');

    $.ajax({
        url : url,
        method : method,
        data : form.serialize(),
        success : function (response) {
            form.trigger('reset');
            $('#modal').modal('hide');
            $('#table').DataTable().ajax.reload();

            swal({
                title : 'sUSXESS!!',
                type : 'success',
                text : 'Oke'
            });

        },
        error : function (xhr) {
            var res = xhr.responseJSON;
            if ($.isEmptyObject(res) == false) {
                $.each(res.errors, function (key,value) {
                    $('#' + key)
                        .closest('.form-group')
                        .addClass('has-error')
                        .append('<span class="help-block"><strong>' + value + '</strong></span')
                });
            }
        }
    });
});

$('body').on('click','.btn-delete',function(e){
    e.preventDefault();

    var me = $(this),
        url = me.attr('href'),
        csrf_token = $('meta[name="csrf-token"]').attr('content');

    swal({
        title : 'Are you sure?',
        text : 'Okeee',
        type : 'warning',
        showCancelButton : true,
        confirmButtonColor : '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : 'Yes Delete'
    }).then((result)=> {
        if (result.value) {
            $.ajax({
                url : url,
                type : 'POST',
                data : {
                    '_method' : 'DELETE',
                    '_token' : csrf_token
                },
                success : function (response) {
                    $('#table').DataTable().ajax.reload();
                    swal({
                        type : 'success',
                        title : 'Sucesss',
                        text : 'Okeee'
                    });
                },
                error : function (xhr) {
                    swal({
                        type : 'error',
                        title : 'Opps',
                        text : 'Something'
                    });
                }
            });
        }
    });
});

$('body').on('click','.btn-show',function(e){
    e.preventDefault();

    var me = $(this),
        url = me.attr('href'),
        title = me.attr('title');

    $('#modal-title').text(title);
    $('#modal-btn-save').addClass('hide');

    $.ajax({
        url : url,
        dataType: 'html',
        success : function (response) {
            $('#modal-body').html(response);
        }
    });

    $('#modal').modal('show');
})
