import { Lesson } from './Lesson'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetLessonsQuery } from '../graphql/generated'

interface SidebarProps {
    hasLessonSlug: boolean
}

export function Sidebar({ hasLessonSlug }: SidebarProps) {
    const { data } = useGetLessonsQuery()

    const navigate = useNavigate()

    useEffect(() => {
        if (!hasLessonSlug && data) {
            navigate(`/event/lesson/${data?.lessons[0].slug}`)
        }
    }, [hasLessonSlug, data, navigate])

    return (
        <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Cronograma de aulas
            </span>

            <div className="flex flex-col gap-8">
                {data?.lessons.map((lesson) => {
                    return (
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            slug={lesson.slug}
                            availableAt={new Date(lesson.availableAt)}
                            type={lesson.lessonType}
                        />
                    )
                })}
            </div>
        </aside>
    )
}
