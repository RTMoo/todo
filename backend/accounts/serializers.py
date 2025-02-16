from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.models import CustomUser


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )
            if not user:
                raise serializers.ValidationError("Неверные email или пароль")
        else:
            raise serializers.ValidationError("Необходимо указать email и пароль")

        refresh = self.get_token(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "email": user.email,
        }


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email"]


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
    )
    password = serializers.CharField(
        write_only=True,
    )
    password2 = serializers.CharField(
        write_only=True,
    )

    class Meta:
        model = CustomUser
        fields = ["email", "password", "password2"]

    def validate(self, data):
        if CustomUser.objects.only("id").filter(email=data["email"]).exists():
            raise serializers.ValidationError({"email": "That email already exists"})

        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match"})

        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        user = CustomUser.objects.create_user(**validated_data)
        return user
