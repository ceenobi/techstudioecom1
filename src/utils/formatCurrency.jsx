const currency_Format = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
})
export function formatCurrency(number) {
  return currency_Format.format(number)
}
