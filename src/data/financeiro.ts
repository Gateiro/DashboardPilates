import { Transaction } from "@/types/transacao";

export const financialData: Transaction[] = [
    {
        id: 1,
        description: "Mensalidade - Maria Silva",
        amount: 350.00,
        type: "income",
        category: "Mensalidade",
        date: "2026-01-28",
        status: "pago",
        paymentMethod: "Pix"
    },
    {
        id: 2,
        description: "Conta de Energia",
        amount: 280.50,
        type: "expense",
        category: "Contas Fixas",
        date: "2026-01-10",
        status: "pago",
        paymentMethod: "Boleto"
    },
    {
        id: 3,
        description: "Manutenção Reformer",
        amount: 150.00,
        type: "expense",
        category: "Manutenção",
        date: "2026-01-15",
        status: "pago",
        paymentMethod: "Dinheiro"
    },
    {
        id: 4,
        description: "Mensalidade - João Souza",
        amount: 350.00,
        type: "income",
        category: "Mensalidade",
        date: "2026-01-29",
        status: "pendente",
        paymentMethod: "Cartão Crédito"
    },
    {
        id: 5,
        description: "Compra de Acessórios (Bolas)",
        amount: 420.00,
        type: "expense",
        category: "Equipamentos",
        date: "2026-01-20",
        status: "pago",
        paymentMethod: "Cartão Débito"
    }
];