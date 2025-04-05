from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from process_sponsors import process_sponsors
from trends_visualization import generate_marketing_trends, create_trend_visualizations

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
import smtplib
import json

# Email sending function
def send_sponsorship_email(email, sponsor_name):
    sender_email = 'suppport.sys.help@gmail.com'
    sender_name = 'CSI TSEC'
    sender_password = 'fesnnalhccqvlidj'

    smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
    smtp_server.starttls()
    smtp_server.login(sender_email, sender_password)

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

    message = MIMEMultipart()
    message["From"] = formataddr((sender_name, sender_email))
    message["To"] = email
    message["Subject"] = "Sponsorship Opportunity for CSI TSEC Hackathon"
    message.attach(MIMEText(email_message, "html"))

    try:
        smtp_server.sendmail(sender_email, email, message.as_string())
        print(f"✅ Email sent to {sponsor_name} at {email}")
        return True
    except Exception as e:
        print(f"❌ Failed to send email to {sponsor_name}: {e}")
        return False
    finally:
        smtp_server.quit()


app = Flask(__name__)
app.secret_key = 'your_super_secret_key_here_change_in_production'

@app.route('/send_bulk_email', methods=['POST'])
def send_bulk_email():
    selected_sponsors = session.get('selected_sponsors', {})
    success_count = 0
    failure_count = 0

    for type_name, sponsors in selected_sponsors.items():
        for sponsor in sponsors:
            if send_sponsorship_email(sponsor['email'], sponsor['sponsor']):
                success_count += 1
            else:
                failure_count += 1

    if success_count > 0:
        return jsonify({'success': True, 'message': f'Sent {success_count} emails successfully.'})
    else:
        return jsonify({'success': False, 'message': 'No emails were sent.'})


@app.route('/', methods=['GET'])
def index():
    top_sponsors = process_sponsors()
    return render_template('index.html', sponsors=top_sponsors)

@app.route('/trends')
def marketing_trends():
    trends_data = generate_marketing_trends()
    visualizations = create_trend_visualizations(trends_data)
    return render_template('trends.html', visualizations=visualizations)

@app.route('/select_sponsors', methods=['POST'])
def select_sponsors():
    top_sponsors = process_sponsors()
    selected_sponsors = {}
    
    for type_name, sponsors in top_sponsors.items():
        selected = request.form.getlist(f'{type_name}_sponsors')
        if selected:
            selected_sponsors[type_name] = [
                sponsor for sponsor in sponsors 
                if sponsor['sponsor'] in selected
            ]
    
    session['selected_sponsors'] = selected_sponsors
    return redirect(url_for('selected_sponsors'))

@app.route('/selected_sponsors')
def selected_sponsors():
    selected = session.get('selected_sponsors', {})
    return render_template('selected_sponsors.html', selected_sponsors=selected)

if __name__ == '__main__':
    app.run(debug=True, port=8010)