@extends('layouts.app')
@section('content')
    <div class="panel panel-primary">
        <div class="panel-heading">
            <div class="panel-title">User
                <a href="{{ route('user.create') }}" class="btn btn-success modal-show pull-right"
                title="Create" style="margin-top: -8px;">Create</a>
            </div>
        </div>
        <div class="panel-body">
            <table id="table" class="table table-hover">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        $('#table').DataTable({
            responsive : true,
            serverSide : true,
            processing : true,
            ajax : "{{ route('table.user') }}",
            columns : [
                {data : 'DT_RowIndex', name : 'id'},
                {data : 'name', name : 'name'},
                {data : 'email', name : 'email'},
                {data : 'action', name : 'action'}
            ]
        });
    </script>
@endpush
