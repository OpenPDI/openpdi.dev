$.fn.dataTable.ext.classes.sPageButton = 'button is-medium'
var database = $('#database').DataTable({
  responsive: true,
  pageLength: 5,
  lengthChange: false,
  order: [[ 0, 'desc' ]],
  language: {
    'zeroRecords': 'No matching records found.'
  },
  ajax: $SCRIPT_ROOT + '/_shootings',
  columns: [
    { 'data': 'date' },
    { 'data': 'name' },
    { 'data': 'age',
      render: function (data, type, row) {
        return data === '' ? 'N/A' : data
      }
    },
    { 'data': 'gender' },
    { 'data': 'race',
      render: function (data, type, row) {
        return data === '' ? 'N/A' : data
      }
    },
    { 'data': 'state' },
    { 'data': 'armed' },
    { 'data': 'flee' }
  ],
  'columnDefs': [
    { type: 'date', targets: 0 },
    { type: 'num', targets: 2 }
  ]
})
