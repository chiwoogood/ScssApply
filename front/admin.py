from django.contrib import admin
from .models import Book

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'genre', 'published_date')
    list_filter = ('genre', 'published_date')
    search_fields = ('title', 'author')


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'birth_date', 'country')
    list_filter = ('country',)
    search_fields = ('name',)

admin.site.register(Book, BookAdmin)