$.fn.dataTable.ext.classes.sPageButton = 'button is-medium'
var database = $('#database').DataTable({
  responsive: true,
  scrollY: '300px',
  scrollCollapse: true,
  searching: false,
  pageLength: 50,
  lengthChange: false,
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
  ]
  /* dom: 'lfrtip',
  buttons: [
    {
      extend: 'csvHtml5',
      text: 'Export as CSV',
      className: 'button is-medium is-rounded is-light'
    },
    {
      extend: 'pdfHtml5',
      text: 'Export as PDF',
      className: 'button is-medium is-rounded is-light'
    }
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
  } */
})
