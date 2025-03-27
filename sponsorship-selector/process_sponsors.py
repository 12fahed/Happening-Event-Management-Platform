import pandas as pd
import re

def process_sponsors():
    # Read the CSV file
    df = pd.read_csv('sponsors_final.csv')
    
    # Define relevance for hackathon
    hackathon_relevant_types = [
        'Technical', 'Money', 'Goodies', 
        'Sports', 'Telecom', 'Bank'
    ]
    
    # Function to score sponsorship relevance
    def score_sponsorship(previous_deal):
        if pd.isna(previous_deal):
            return 0
        
        # Define keywords and their scores
        keywords = {
            'technical equipment': 5,
            'trophy': 3,
            'prize money': 4,
            'publicity': 2,
            'jerseys': 2,
            'discount': 1
        }
        
        # Convert to lowercase for case-insensitive matching
        previous_deal_lower = str(previous_deal).lower()
        
        # Calculate score based on keywords
        score = sum(score for keyword, score in keywords.items() 
                    if keyword in previous_deal_lower)
        
        return score
    
    # Prepare top sponsors for each relevant type
    top_sponsors = {}
    for type_name in hackathon_relevant_types:
        # Filter sponsors by type
        type_sponsors = df[df['type'] == type_name].copy()
        
        # Add sponsorship score column
        type_sponsors['sponsorship_score'] = type_sponsors['previous_deal'].apply(score_sponsorship)
        
        # Sort by score and get top 3
        top_3_sponsors = type_sponsors.nlargest(3, 'sponsorship_score')
        
        top_sponsors[type_name] = top_3_sponsors[['sponsor', 'previous_deal', 'email', 'phone']].to_dict('records')
    
    return top_sponsors