

# TalkWithMyGenAI
A full-stack AI chatbot built with Node.js, Express, EJS, HTML, CSS, and JavaScript, powered by a locally hosted Llama 3 model using Ollama. Designed for AWS deployment with CloudFormation, it features an Application Load Balancer, Auto Scaling Group, private EC2 instances, and an S3 bucket for static content.

For this project, I have used my knowledge in Cloud to create a solution to use Ollama model into a static web site where no data have been stored and to use AWS Cloud to architect an infrastructure to host and the website using a high availability infrastructure. However, during the development of the project I made sure that each session would save it's information temporarily to give a valid answer to the user. But, whenever, the user restart the chat, the user will have a new chat from the start. in that way, I gave the opportunity for the user to have a valid conversation with the model and to not use any relational database to save user related data such as an id or any specific information.



<img width="1892" height="942" alt="Talk1" src="https://github.com/user-attachments/assets/f8bc3054-965d-4a91-9995-9b342714068b" />

<img width="1892" height="942" alt="Talk2" src="https://github.com/user-attachments/assets/0d04d0cf-1ab3-4541-aa8d-a70411524ccc" />
