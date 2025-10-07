#!/bin/bash

# Enhanced Social Media Crawler Test Script
# Tests meta tags and social media preview functionality

DOMAIN="https://remy.laffuge.fr"
TEMP_DIR="/tmp/social_test"

echo "🔍 Enhanced Social Media Crawler Test for $DOMAIN"
echo "=================================================="

# Create temp directory
mkdir -p "$TEMP_DIR"

# Test function to extract and display meta tags
test_page_meta() {
    local url="$1"
    local page_name="$2"
    local user_agent="${3:-facebookexternalhit/1.1}"

    echo -e "\n📄 Testing $page_name ($url)"
    echo "User-Agent: $user_agent"
    echo "-------------------------------------------"

    # Fetch page with crawler user agent
    response=$(curl -s -H "User-Agent: $user_agent" "$url")

    # Extract and display key meta tags
    echo "Title: $(echo "$response" | grep -oP '<title[^>]*>\K[^<]+' || echo 'Not found')"
    echo "Description: $(echo "$response" | grep -oP '<meta[^>]*name=["\']description["\'][^>]*content=["\'][^"\']*' | grep -oP 'content=["\'][^"\']*' | sed 's/content=["\']//g' || echo 'Not found')"
    echo "OG Title: $(echo "$response" | grep -oP '<meta[^>]*property=["\']og:title["\'][^>]*content=["\'][^"\']*' | grep -oP 'content=["\'][^"\']*' | sed 's/content=["\']//g' || echo 'Not found')"
    echo "OG Description: $(echo "$response" | grep -oP '<meta[^>]*property=["\']og:description["\'][^>]*content=["\'][^"\']*' | grep -oP 'content=["\'][^"\']*' | sed 's/content=["\']//g' || echo 'Not found')"
    echo "OG Image: $(echo "$response" | grep -oP '<meta[^>]*property=["\']og:image["\'][^>]*content=["\'][^"\']*' | grep -oP 'content=["\'][^"\']*' | sed 's/content=["\']//g' || echo 'Not found')"

    # Save full response for debugging
    echo "$response" > "$TEMP_DIR/${page_name// /_}_response.html"
}

# Test different pages with different crawlers
test_page_meta "$DOMAIN/" "Homepage" "facebookexternalhit/1.1"
test_page_meta "$DOMAIN/expedition-33" "Expedition 33" "facebookexternalhit/1.1"

echo -e "\n🤖 Testing with different crawler user agents..."
test_page_meta "$DOMAIN/expedition-33" "Expedition 33 (Twitter)" "Twitterbot/1.0"
test_page_meta "$DOMAIN/expedition-33" "Expedition 33 (WhatsApp)" "WhatsApp/2.0"

# Test OG image accessibility
echo -e "\n🖼️ Testing Open Graph image accessibility..."
og_status=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/og-image.jpg")
echo "OG Image Status: $og_status"

if [ "$og_status" = "200" ]; then
    echo "✅ OG Image accessible"
else
    echo "❌ OG Image not accessible"
fi

echo -e "\n📁 Response files saved in: $TEMP_DIR"
echo -e "\n🔧 Manual testing tools:"
echo "• Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/?q=$DOMAIN"
echo "• Twitter Card Validator: https://cards-dev.twitter.com/validator"
echo "• LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/"

echo -e "\n✅ Enhanced test completed!"
