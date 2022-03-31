function main(){
    displayStats();
    displayInventory();
    displayMonsters();
    selectAll();
    displayUpgradableStat(true);
    saveButton();

    // Making bootstrap tooltip usable and not intrusive
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    $('[data-bs-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
      });
}

main();
