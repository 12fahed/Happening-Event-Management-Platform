from flask import Flask, render_template, request, session, redirect, url_for
from process_sponsors import process_sponsors
from trends_visualization import generate_marketing_trends, create_trend_visualizations

app = Flask(__name__)
app.secret_key = 'your_super_secret_key_here_change_in_production'

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