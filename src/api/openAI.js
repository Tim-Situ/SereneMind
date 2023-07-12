import axios from "axios";
import { apiKey } from "../constants";

const client = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
    }
})

const chatgptUrl = 'https://api.openai.com/v1/chat/completions'

export const apiCall = async(prompt, messages) => {
    // try {
    //     const res = await client.post(chatGptEndpoint, {
    //         model: 'gpt-3.5-turbo',
    //         messages: [{
    //             role: 'user',
    //             content: prompt
    //         }]
    //     })
    //     console.log('data:', res.data.choices[0].message)
    // } catch (error) {
    //     console.log(error)
    //     return Promise.resolve({success: false, msg: error.message})
    // }
    try{
        const res = await client.post(chatgptUrl, {
            model: "gpt-3.5-turbo",
            messages
        })

        let answer = res.data?.choices[0]?.message?.content;
        messages.push({role: 'assistant', content: answer.trim()});
        // console.log('got chat response', answer);
        return Promise.resolve({success: true, data: messages}); 

    }catch(err){
        console.log('error: ',err);
        return Promise.resolve({success: false, msg: err.message});
    }
}