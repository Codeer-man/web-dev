import {Schema,model} from "mongoose";

const contactschema = new Schema({
    username :{type: String, required: true},
    email :{type: String, required: true},
    password:{type: String, required: true}
})

const contact = new model("contact",contactschema);
export default contact;