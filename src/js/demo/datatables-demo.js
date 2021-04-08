// Call the dataTables jQuery plugin

$(document).ready(function () {
  $('#dataTable').DataTable({
    ajax: "/user/data",
    columns: [
      { data: "name" },
      { data: "email" },
      { data: "loc" },
      { data: "kayit" },
      { data: "uid"}
    ]
  });
});
