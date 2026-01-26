
const Data = [
    {
        id: 1,
        reason: "Chat",
        title: "Estou com uma duvida",
        user: "Aluno 1"
    },
    {
        id: 2,
        reason: "Chat",
        title: "Poderia me dar uma dica?",
        user: "Aluno 2"
    },
    {
        id: 3,
        reason: "Chat",
        title: "Parabéns pela aula",
        user: "Aluno 3"
    },
    {
        id: 4,
        reason: "Cancelamento",
        title: "Cancelamento de aula",
        user: "Aluno 4"
    }
]

export function NotificacoesModal({ closeModal }: { closeModal: (isOpen: boolean) => void }) {
    return (
        <div className="fixed inset-0 z-50 flex justify-end"
            onClick={() => closeModal(false)}
        >
            <div className="absolute flex flex-col h-50 w-100 rounded-b-md bg-black/10 backdrop-blur-md top-15 right-5 z-60"
                onClick={(e) => e.stopPropagation()}
            >
                <ul className="flex flex-col gap-3 overflow-y-auto custom-scroll p-2">
                    {Data.map((item =>
                        <button key={item.id} className="cursor-pointer">
                            <li className="bg-black/10 backdrop-blur-md rounded-lg p-2 text-left">
                                <p>{item.reason} - {item.title}</p>
                                <p>Por: {item.user}</p>
                            </li>
                        </button>
                    ))}
                </ul>
            </div>

        </div>
    )
}