
/**
 * Finds the specified taxes
 */
exports.findTaxes = function(filter) {

  if (filter.unpaied != null && filter.unpaied == 'true') return {linkedPaymentId : null};

  return {};
}

/**
 * Sorts taxes by descending year
 */
exports.sortTaxesYearDesc = function() {

  return {year: -1};
}

/**
 * Conversts the provided PO into a TO Tax
 */
exports.tax = function(po) {

  return {
    amount: po.amount,
    dueDate: po.dueDate,
    id: po._id,
    linkedPaymentId: po.linkedPaymentId,
    year: parseInt(po.year),
    ingiunzione: po.ingiunzione
  };
}

/**
 * Creates the PO for the provided tax to
 */
exports.persistentTax = function(to) {

  var persistentIngiunzione = function(ing) {

    if (ing == null) return null;

    return {
      amount : parseFloat(ing.amount),
      dueDate : ing.dueDate,
      reference : ing.reference
    };
  }

  return {
    amount: parseFloat(to.amount),
    dueDate: to.dueDate,
    linkedPaymentId: null,
    year: parseInt(to.year),
    ingiunzione: persistentIngiunzione(to.ingiunzione)
  };
}

/**
 * Retrieves the amount to pay for the provide tax po
 */
exports.getAmountToPay = function(po) {

  if (po.ingiunzione != null) return parseFloat(po.ingiunzione.amount);

  return parseFloat(po.amount);
}

/**
 * Updates a tax with the provided data
 */
exports.update = function(data) {

  var persistentIngiunzione = function(ing) {

    if (ing == null) return null;

    return {
      amount : parseFloat(ing.amount),
      dueDate : ing.dueDate,
      reference : ing.reference
    };
  }

  if (data.linkedPaymentId != null) return {$set: {linkedPaymentId : data.linkedPaymentId}};

  if (data.ingiunzione != null) return {$set : {ingiunzione : persistentIngiunzione(data.ingiunzione)}};
}
