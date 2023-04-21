import { Logo } from '../components/Logo'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateSubscriberMutation } from '../graphql/generated'
import reactIcon from '../../../../../src/assets/react-icon.svg'
import codeMockup from '../../../../../src/assets/code-mockup.png'

export function Subscribe() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const [createSubscriber, { loading }] = useCreateSubscriberMutation()

    async function handleSubscribe(event: FormEvent) {
        event?.preventDefault()
        console.log(name, email)

        if (!name.length || !email.length) {
            return
        }

        await createSubscriber({
            variables: {
                name,
                email,
            },
        })

        navigate('/event')
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <img src={reactIcon} alt="" className="absolute mt-4 opacity-60 " />

            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                <div className="max-w-[640px]">
                    <Logo />
                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>,
                        do zero, com <strong className="text-blue-500">React</strong>
                    </h1>
                    <p className="mt-4 text-gray-300 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais
                        utilizadas e com alta demanda para acessar as melhores oportunidades do
                        mercado.
                    </p>
                </div>

                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                            type="text"
                            placeholder="Seu nome completo"
                            className="bg-gray-900 rounded px-5 h-14"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            className="bg-gray-900 rounded px-5 h-14"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-blue-600 uppercase py-4 rounded font-medium text-sm hover:bg-blue-700 transition-colors"
                        >
                            Garantir minha vaga
                        </button>
                    </form>
                </div>
            </div>

            <img src={codeMockup} alt="" className="mt-4" />
        </div>
    )
}
