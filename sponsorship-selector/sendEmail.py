from flask import Flask, render_template, request, jsonify
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
import smtplib

app = Flask(__name__)

# Function to send sponsorship email
def send_sponsorship_email(email, sponsor_name):
    sender_email = 'suppport.sys.help@gmail.com'
    sender_name = 'CSI TSEC'
    sender_password = 'fesnnalhccqvlidj'

    smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
    smtp_server.starttls()
    smtp_server.login(sender_email, sender_password)

    # Email Content
    email_message = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px;">
        <h2 style="color: #073B7B;">Sponsorship Opportunity - CSI TSEC Hackathon</h2>
        <p>Hello <strong>{sponsor_name},</strong></p>
        <p>
            We are writing on behalf of <strong>CSI TSEC</strong> to invite you to partner with us as a sponsor for our upcoming
            <strong>Hackathon</strong>. The event aims to bring together young innovators to collaborate and solve real-world problems.
        </p>
        <p><strong>Event Details:</strong></p>
        <ul>
            <li><strong>Event Name:</strong> CSI TSEC Hackathon</li>
            <li><strong>Date:</strong> [Insert Date]</li>
            <li><strong>Venue:</strong> [Insert Venue or mention if virtual]</li>
            <li><strong>Expected Participants:</strong> 300+ talented tech enthusiasts</li>
        </ul>
        <p>
            We believe this is a great opportunity for <strong>{sponsor_name}</strong> to engage with young talent and gain exposure within the tech community.
        </p>
        <p style="margin-top: 20px;">Thank you for considering this partnership. We look forward to discussing this further.</p>
        <p>Best regards,<br><strong>Team CSI TSEC</strong></p>
    </div>
    """

    # Prepare the email
    message = MIMEMultipart()
    message["From"] = formataddr((sender_name, sender_email))
    message["To"] = email
    message["Subject"] = "Sponsorship Opportunity for CSI TSEC Hackathon"
    
    # Attach the email content
    message.attach(MIMEText(email_message, "html"))

    try:
        smtp_server.sendmail(sender_email, email, message.as_string())
        print(f"Email sent to {email}")
        return True
    except Exception as e:
        print(f"Failed to send email to {email}: {e}")
        return False
    finally:
        smtp_server.quit()

# Dummy sponsor data for HTML
sponsors = [
    {"name": "ABC Corp", "previous_deal": "$5000", "email": "abc_corp@example.com"},
    {"name": "XYZ Tech", "previous_deal": "$3000", "email": "xyz_tech@example.com"},
    {"name": "LMN Innovations", "previous_deal": "No previous deal", "email": "lmn_innovations@example.com"}
]

@app.route('/')
def index():
    return render_template('index.html', sponsors=sponsors)

@app.route('/send-sponsor-email', methods=['POST'])
def send_sponsor_email():
    data = request.json
    email = data.get('email')
    sponsor_name = data.get('name')

    if send_sponsorship_email(email, sponsor_name):
        return jsonify({'success': True, 'message': 'Email sent successfully!'})
    else:
        return jsonify({'success': False, 'message': 'Failed to send email.'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
