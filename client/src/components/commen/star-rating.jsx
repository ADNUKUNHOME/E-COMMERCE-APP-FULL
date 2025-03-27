import { StarIcon } from "lucide-react"
import { Button } from "../ui/button"

const StarRating = ({ rating, handleRatingChange }) => {
    return (

        [1, 2, 3, 4, 5].map((star) => <Button onClick={handleRatingChange ? () => handleRatingChange(star) : null} className={`p-2 rounded-full transition-colors ${star <= rating ? 'text-yellow-500 hover:bg-black' : 'text-black dark:text-white hover:bg-primary hover:text-primary-foreground'}`} variant='outline' size='icon'>
            <StarIcon className={`w-8 h-8 ${star <= rating ? 'fill-yellow-500' : 'fill-black dark:fill-white'}`} />
        </Button>)

    )
}

export default StarRating
