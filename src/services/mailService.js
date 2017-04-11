import { sendGrid } from '../configs'
import { mail } from 'sendgrid'

const send = function () {
  let fromEmail = new mail.Email('noreply@event-with.firebaseapp.com')
  let toEmail = new mail.Email('kevin.valette@gmail.com')
  let subject = 'Sending with SendGrid is Fun'
  let content = new mail.Content('text/plain', 'and easy to do anywhere, even with Node.js')
  let mail = new mail.Mail(fromEmail, subject, toEmail, content)

  let request = sendGrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: this.mail.toJSON()
  })

  sendGrid.API(request, function (error, response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  })
}

export { send }
