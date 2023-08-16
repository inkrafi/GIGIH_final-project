export function formatCurrency(amount) {
    // Menggunakan Number.toLocaleString() untuk format ribuan dan desimal
    return Number(amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}