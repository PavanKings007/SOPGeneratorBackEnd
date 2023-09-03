require('dotenv').config();

const {OpenAI} = require('openai');

const openai = new OpenAI({
    apiKey:process.env.AI_KEY,
})



async function chatGPT(prompt,data){
     try{
    const result = await openai.chat.completions.create({
        messages: [{ role: 'user', content:`name = ${prompt.name},email = ${prompt.email},age=${prompt.age},highestEducationLevel=${prompt.higesttEducationLevel},yearOfPass=${prompt.yearOfPass},highestLevelEducationInstitute=${prompt.highestLevelEducationInstitute},highestLevelEducationCourse=${prompt.highestLevelEducationCourse},experience=${prompt.experience},admittedInstituteInCanada=${prompt.admittedInstituteInCanada},admittedInstituteInCanadaCourse=${prompt.admittedInstituteInCanadaCourse},appliedLocation=${prompt.appliedLocation},goals=${prompt.goals},EnglishSkills=${prompt.englishSkills},firstFeePaid=${prompt.firstFeePayed},firstFeePaidAmount=${prompt.firstFeePayedAmount},GICPaid=${prompt.gicPayed},GICPaidFee=${prompt.gicPayedFee}` + data }],
        model: 'gpt-3.5-turbo',
      });
      
      const completion = result.choices[0].message.content;
      return completion
    }
    catch(error){
        throw error;
    }
}


module.exports = {chatGPT}
