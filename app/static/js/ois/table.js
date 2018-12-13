var database = $('#database').DataTable({
  order: [[ 0, 'desc' ]],
  language: {
    'zeroRecords': 'No matching records found.'
  },
  data: wapo_db,
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
  ],
  dom: 'Blfrtip',
  buttons: [
    'csvHtml5',
    'pdfHtml5'
  ],
  'oTableTools': {
    'aButtons': [
      {'sExtends': 'csv',
        'oSelectorOpts': { filter: 'applied', order: 'current' }
      },
      {'sExtends': 'pdf',
        'oSelectorOpts': { filter: 'applied', order: 'current' }
      }
    ]
  }
})
