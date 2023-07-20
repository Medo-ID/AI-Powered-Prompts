import User from "@models/user"
import { connectToDB } from "@utils/db"

export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        const user = await User.find({
            _id: params.id
        })

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 })
    }
}