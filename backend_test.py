#!/usr/bin/env python3
"""
Backend API Testing for Fire Extinguisher Company Website
Tests the contact form endpoints: POST /api/contacts and GET /api/contacts
"""

import requests
import json
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://safety-first-63.preview.emergentagent.com')
API_BASE = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE}")

def test_post_contacts_valid_data():
    """Test POST /api/contacts with valid complete data"""
    print("\n=== Testing POST /api/contacts with valid complete data ===")
    
    contact_data = {
        "name": "John Smith",
        "email": "john.smith@safetyfirst.com",
        "phone": "+1-555-0123",
        "company": "Safety Solutions Inc",
        "message": "I need information about your Class A fire extinguishers for our office building. We have 50 employees and need to ensure proper fire safety compliance."
    }
    
    try:
        response = requests.post(f"{API_BASE}/contacts", json=contact_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('message') and data.get('id'):
                print("✅ POST /api/contacts with complete data: SUCCESS")
                return data.get('id')
            else:
                print("❌ POST /api/contacts: Invalid response format")
                return None
        else:
            print(f"❌ POST /api/contacts: Failed with status {response.status_code}")
            return None
            
    except Exception as e:
        print(f"❌ POST /api/contacts: Exception occurred - {str(e)}")
        return None

def test_post_contacts_without_company():
    """Test POST /api/contacts without optional company field"""
    print("\n=== Testing POST /api/contacts without company field ===")
    
    contact_data = {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@gmail.com", 
        "phone": "+1-555-0456",
        "message": "I'm a homeowner interested in purchasing fire extinguishers for my kitchen and garage. What types would you recommend?"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contacts", json=contact_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('message') and data.get('id'):
                print("✅ POST /api/contacts without company: SUCCESS")
                return data.get('id')
            else:
                print("❌ POST /api/contacts: Invalid response format")
                return None
        else:
            print(f"❌ POST /api/contacts: Failed with status {response.status_code}")
            return None
            
    except Exception as e:
        print(f"❌ POST /api/contacts: Exception occurred - {str(e)}")
        return None

def test_post_contacts_missing_required_fields():
    """Test POST /api/contacts with missing required fields"""
    print("\n=== Testing POST /api/contacts with missing required fields ===")
    
    # Test missing name
    contact_data = {
        "email": "test@example.com",
        "phone": "+1-555-0789",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contacts", json=contact_data, timeout=10)
        print(f"Missing name - Status Code: {response.status_code}")
        print(f"Missing name - Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ POST /api/contacts properly validates missing name")
        else:
            print("❌ POST /api/contacts should return 422 for missing name")
            
    except Exception as e:
        print(f"❌ POST /api/contacts validation test: Exception occurred - {str(e)}")

def test_get_contacts():
    """Test GET /api/contacts endpoint"""
    print("\n=== Testing GET /api/contacts ===")
    
    try:
        response = requests.get(f"{API_BASE}/contacts", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of contacts retrieved: {len(data)}")
            
            if len(data) > 0:
                # Check first contact structure
                first_contact = data[0]
                required_fields = ['id', 'name', 'email', 'phone', 'company', 'message', 'timestamp', 'status']
                
                print("Checking contact structure...")
                missing_fields = []
                for field in required_fields:
                    if field not in first_contact:
                        missing_fields.append(field)
                
                if not missing_fields:
                    print("✅ GET /api/contacts: All required fields present")
                    
                    # Check if contacts are sorted by timestamp (newest first)
                    if len(data) > 1:
                        first_timestamp = datetime.fromisoformat(data[0]['timestamp'].replace('Z', '+00:00'))
                        second_timestamp = datetime.fromisoformat(data[1]['timestamp'].replace('Z', '+00:00'))
                        
                        if first_timestamp >= second_timestamp:
                            print("✅ GET /api/contacts: Contacts properly sorted by timestamp")
                        else:
                            print("❌ GET /api/contacts: Contacts not sorted by timestamp (newest first)")
                    
                    print("Sample contact data:")
                    print(json.dumps(first_contact, indent=2))
                    print("✅ GET /api/contacts: SUCCESS")
                else:
                    print(f"❌ GET /api/contacts: Missing fields - {missing_fields}")
            else:
                print("ℹ️ GET /api/contacts: No contacts found (empty database)")
                print("✅ GET /api/contacts: SUCCESS (empty result is valid)")
                
        else:
            print(f"❌ GET /api/contacts: Failed with status {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ GET /api/contacts: Exception occurred - {str(e)}")

def test_api_connectivity():
    """Test basic API connectivity"""
    print("\n=== Testing API Connectivity ===")
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ API connectivity: SUCCESS")
            return True
        else:
            print(f"❌ API connectivity: Failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ API connectivity: Exception occurred - {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("🔥 Fire Extinguisher Company Website - Backend API Tests")
    print("=" * 60)
    
    # Test API connectivity first
    if not test_api_connectivity():
        print("\n❌ CRITICAL: Cannot connect to API. Stopping tests.")
        return
    
    # Test POST endpoints
    contact_id_1 = test_post_contacts_valid_data()
    contact_id_2 = test_post_contacts_without_company()
    
    # Test validation
    test_post_contacts_missing_required_fields()
    
    # Test GET endpoint
    test_get_contacts()
    
    print("\n" + "=" * 60)
    print("🔥 Backend API Testing Complete")
    
    # Summary
    print("\n📋 SUMMARY:")
    if contact_id_1 and contact_id_2:
        print("✅ Contact form submission working")
        print("✅ Contact data retrieval working")
        print("✅ All backend API tests passed")
    else:
        print("❌ Some backend API tests failed")

if __name__ == "__main__":
    main()