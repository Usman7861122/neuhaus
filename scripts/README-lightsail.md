# Sync the site from S3 to Lightsail

Flow: push to GitHub -> GitHub Actions builds -> files land in S3 -> this script (run by cron) copies S3 to the Lightsail web folder.

## One-time setup on the Lightsail server (SSH in)

1. Install tools: `sudo apt-get update && sudo apt-get install -y awscli rsync` (use `sudo dnf install -y awscli rsync` on Amazon Linux)
2. Make a READ-ONLY AWS user for the server (IAM > Users > Create user `lightsail-neuhaus-read`, no console access) with this policy, then create an access key:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       { "Effect": "Allow", "Action": ["s3:ListBucket"], "Resource": "arn:aws:s3:::neuhaus-website" },
       { "Effect": "Allow", "Action": ["s3:GetObject"], "Resource": "arn:aws:s3:::neuhaus-website/*" }
     ]
   }
   ```
3. On the server run `aws configure` and type the key, secret, your bucket region, and `json`. (Type them on the server yourself.)
4. Copy the script: `sudo cp lightsail-sync.sh /usr/local/bin/neufoot-sync && sudo chmod +x /usr/local/bin/neufoot-sync`
5. Test it once: `sudo WEB_ROOT=/var/www/neufoot AWS_REGION=us-east-1 neufoot-sync && tail /var/log/neufoot-sync.log`
6. Add the cron job: `sudo crontab -e` and add this line (every 5 minutes):
   `*/5 * * * * AWS_REGION=us-east-1 WEB_ROOT=/var/www/neufoot /usr/local/bin/neufoot-sync`
   (If `aws configure` was done as your normal user, run `crontab -e` without sudo instead and make sure that user can write to the folders.)

## Web server (nginx) must point at the same folder

```
root /var/www/neufoot;
index index.html;
location / { try_files $uri $uri/ =404; }
error_page 404 /404.html;
```
Then `sudo nginx -t && sudo systemctl reload nginx`.
