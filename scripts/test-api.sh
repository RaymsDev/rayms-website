#!/bin/bash

# Test the meta API function locally
echo "🧪 Testing Meta API Function"
echo "============================="

# Test the API function directly if deployed
echo -e "\n🌐 Testing deployed API (if available)..."
echo "Testing: https://remy.laffuge.fr/api/meta?path=/expedition-33"
response=$(curl -s -H "User-Agent: facebookexternalhit/1.1" "https://remy.laffuge.fr/api/meta?path=/expedition-33")

if [[ $response == *"Expedition 33"* ]]; then
    echo "✅ API function is working correctly"
    echo "Title found in response: $(echo "$response" | grep -i '<title' | sed 's/<title[^>]*>//i' | sed 's/<\/title>.*//i')"
else
    echo "❌ API function may not be working"
    echo "Response preview:"
    echo "$response" | head -n 20
fi

echo -e "\n🔍 Testing direct expedition-33 route with crawler user-agent..."
response2=$(curl -s -H "User-Agent: facebookexternalhit/1.1" "https://remy.laffuge.fr/expedition-33")

if [[ $response2 == *"Expedition 33"* ]]; then
    echo "✅ Direct route is working correctly"
    echo "Title found: $(echo "$response2" | grep -i '<title' | sed 's/<title[^>]*>//i' | sed 's/<\/title>.*//i')"
else
    echo "❌ Direct route not working as expected"
    echo "Response preview:"
    echo "$response2" | head -n 10
fi

echo -e "\n✅ API test completed!"
