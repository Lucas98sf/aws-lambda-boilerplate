#! /bin/bash
mkdir logs
(
	lambda_name=${PWD##*/}
	lambda_name=${lambda_name:-/} 
	aws iam create-role --role-name $lambda_name --assume-role-policy-document file://aws/trust-policy.json
	aws iam attach-role-policy --role-name $lambda_name --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole 
	zip -r -j bundle.zip dist/bundle.js
	{
	  aws lambda create-function --function-name $lambda_name \
	  --zip-file fileb://bundle.zip --handler bundle.handler --runtime nodejs16.x \
	  --role arn:aws:iam::843942154494:role/$lambda_name
	} || aws lambda update-function-code --function-name $lambda_name --zip-file fileb://bundle.zip
	rm bundle.zip
) 2>&1 | tee logs/deploy.log