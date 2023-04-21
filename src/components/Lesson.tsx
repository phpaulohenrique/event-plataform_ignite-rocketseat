import { format, isPast } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CheckCircle, Lock } from 'phosphor-react'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface LessonProps {
    title: string
    slug: string
    availableAt: Date
    type: 'live' | 'class'
}

export function Lesson(props: LessonProps) {
    const isLessonAvailable = isPast(props.availableAt)
    const { slug } = useParams<{ slug: string }>()
    // eslint-disable-next-line
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm ", {
        locale: ptBR,
    })

    const isActiveLesson = slug === props.slug

    return (
        <Link to={isLessonAvailable ? `/event/lesson/${props.slug}` : ''} className={`group`}>
            <span className="text-gray-300 capitalize">{availableDateFormatted}</span>

            <div
                className={classNames(
                    `rounded border border-gray-500 p-4 mt-2 group-hover:border-sky-700`,
                    {
                        'bg-sky-700': isActiveLesson,
                    }
                )}
            >
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span
                            className={classNames(
                                'text-sm text-blue-500 font-medium flex gap-2 items-center',
                                {
                                    'text-white': isActiveLesson,
                                }
                            )}
                        >
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex gap-2 items-center">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}
                    <span className="text-xs rounded py-[0.125rem] px-2 text-white border border-cyan-500 font-bold">
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong
                    className={classNames('text-gray-200 mt-5 block', {
                        'text-white': isActiveLesson,
                    })}
                >
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}
